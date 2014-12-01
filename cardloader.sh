FILES=./allsetsx-cards/*.json

for f in $FILES
do
    echo "Processing $f..."
    mongoimport --db magicdb --collection cards --type json --file $f --jsonArray
done