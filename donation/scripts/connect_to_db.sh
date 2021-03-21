sset -o errexit
set -o pipefail



cmd="$@"

if [ -z "$SQL_USER" ]; then
    export SQL_USER=donation
fi


export DATABASE_URL=postgres://$SQL_USER:$SQL_PASSWORD@postgres:5432/$SQL_USER


function postgres_ready(){
python << END
import sys
import psycopg2
try:
    conn = psycopg2.connect(dbname="postgres", user="$SQL_USER", password="$SQL_PASSWORD", host="$SQL_HOST")
except psycopg2.OperationalError as e:
    print(e)
    sys.exit(-1)
sys.exit(0)
END
}

until postgres_ready; do
  >&2 echo "Postgres is unavailable - sleeping"
  sleep 1
done

>&2 echo "Postgres is up - continuing..."
exec $cmd