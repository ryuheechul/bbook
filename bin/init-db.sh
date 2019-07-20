
PGPASSWORD=bbookPw psql -h postgres -U postgres -c "CREATE DATABASE bbook;"

PGPASSWORD=bbookPw psql -h postgres -U postgres -f create-table.sql bbook
