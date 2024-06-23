#!/bin/bash
# Бог первый
# от jakepys

set -e

# Colores para el prompt
red="\033[31m"
green="\033[32m"
blue="\033[34m"
re="\033[0m"

# Verificar usuario root
if [[ $UID -ne 0 ]]; then
    echo -e "$green$USER$red debes ejecutar el script como root $re"
    exit 1
fi

# Función principal
main() {
    use="\n\r[?] para obtener más información, utiliza $green --help $re o $green -h $re"

    if [[ $# -eq 0 ]]; then
        echo -e $use
        exit 1
    fi

    if [ $1 == "--help" -o $1 == "-h" ]; then
        echo -e "\rUso: ./initdb.sh [opciones]..."
        echo -e "  $green start $re    Iniciar servicios Docker Compose y salida 0"
        echo -e "  $green stop  $re    Detener servicios Docker Compose y salida 0"
        exit 0
    fi

    # Iniciar servicios Docker Compose
    if [ $1 == "start" ]; then
        docker-compose up -d
        container_id=$(docker-compose ps -q dbpostgresredsocial)                             # id
        container_id_two=$(docker-compose ps -q pgadminredsocial)                            # id psadmim
        container_start_time=$(docker inspect --format '{{.State.StartedAt}}' $container_id) # hora
        formatted_start_time=$(date -d "$container_start_time" '+%Y-%m-%d %H:%M:%S')         # formato
        echo -e "$blue Servicios Docker iniciados con éxito $re"
        echo -e "$green [+] ID del contenedor de dbpostgresredsocial: $blue$container_id $re"
        echo -e "$green [+] Hora de inicio del contenedor: $blue$formatted_start_time $re"
        echo -e "\n"
        echo -e "$green [+] ID del contenedor de pgadminredsocial: $blue$container_id_two $re"
        echo -e "$green [+] Hora de inicio del contenedor: $blue$formatted_start_time $re"
        exit 0
    fi

    # Detener servicios Docker Compose
    if [ $1 == "stop" ]; then
        docker-compose down
        echo -e "$green [+] Servicios $blue Docker $re detenidos con éxito $re"
        exit 0
    fi
}

main "$@"
