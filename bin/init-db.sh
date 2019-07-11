
psql -h postgres -U postgres -c "CREATE DATABASE bbook;"

psql -h postgres -U postgres -f create-table.sql bbook
