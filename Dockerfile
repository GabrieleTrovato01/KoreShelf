# syntax=docker/dockerfile:1
#
# KoreShelf per il self-hosting (server di casa, NAS, Raspberry Pi).
# Immagine pronta:  docker compose up -d   (vedi docker-compose.yml)
# Dal codice:       docker build -t koreshelf .
#
# Due fasi: si compila con Rust, poi si consegna un'immagine Debian slim con il solo eseguibile.

# ---------------------------------------------------------------- 1. compilazione
FROM rust:1-bookworm AS build
WORKDIR /src
# Solo quello che serve alla compilazione (vedi .dockerignore): l'interfaccia arriva già pronta
# in frontend/dist, quindi qui non servono Node.js né npm.
COPY Cargo.toml Cargo.lock build.rs ./
COPY src ./src
COPY assets ./assets
COPY frontend/dist ./frontend/dist
# Versione server (senza finestra). Le cache rendono veloci le build successive.
RUN --mount=type=cache,target=/usr/local/cargo/registry \
    --mount=type=cache,target=/src/target \
    cargo build --release --locked --no-default-features \
 && cp target/release/koreshelf /usr/local/bin/koreshelf

# ---------------------------------------------------------------- 2. immagine finale
FROM debian:bookworm-slim
RUN apt-get update \
 && apt-get install -y --no-install-recommends ca-certificates \
 && rm -rf /var/lib/apt/lists/* \
 && useradd --system --uid 1000 --user-group --home-dir /data --no-create-home koreshelf \
 && mkdir -p /data /app \
 && chown koreshelf:koreshelf /data /app
COPY --from=build /usr/local/bin/koreshelf /usr/local/bin/koreshelf

# Tutta la rete, porta 3000, dati nel volume /data. Password facoltativa: KORESHELF_PASSWORD.
ENV KORESHELF_HOST=0.0.0.0 \
    KORESHELF_PORT=3000 \
    KORESHELF_DATA=/data
# Chi arriva dalla versione Docker 3.x monta la vecchia ./public in /app/public:
# al primo avvio la libreria viene importata in /data.
WORKDIR /app
USER koreshelf
VOLUME ["/data"]
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 CMD ["koreshelf", "--health"]
# docker stop manda SIGTERM: KoreShelf finisce le richieste in corso e si chiude pulito.
STOPSIGNAL SIGTERM
CMD ["koreshelf", "--server"]
