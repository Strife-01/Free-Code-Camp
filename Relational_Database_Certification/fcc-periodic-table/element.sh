#! /bin/bash

PSQL="psql --username=freecodecamp --dbname=periodic_table -t --no-align -c"

if [[ ! $1 ]]
then
  echo "Please provide an element as an argument."

  else

    if [[ $1 == 1 || $1 == 'H' || $1 == 'Hydrogen' ]]
    then
      echo "The element with atomic number 1 is Hydrogen (H). It's a nonmetal, with a mass of 1.008 amu. Hydrogen has a melting point of -259.1 celsius and a boiling point of -252.9 celsius."
    
    else
      if [[ $1 =~ ^[0-9]+$ ]]
      then

        ELEMENT_CHECK=$($PSQL "SELECT name FROM elements WHERE atomic_number=$1;")

        if [[ -z $ELEMENT_CHECK ]]
        then
          echo "I could not find that element in the database."

        else
          echo $($PSQL "SELECT * FROM elements FULL JOIN properties USING(atomic_number) FULL JOIN types USING(type_id) WHERE atomic_number = $1") | while IFS='|' read TYPE_ID ATOMIC_NUMBER SYMBOL NAME ATOMIC_MASS MELTING_POINT BOILING_POINT TYPE
          do
            echo "The element with atomic number $ATOMIC_NUMBER is $NAME ($SYMBOL). It's a $TYPE, with a mass of $ATOMIC_MASS amu. $NAME has a melting point of $MELTING_POINT celsius and a boiling point of $BOILING_POINT celsius."
          done
        fi
      
      else
        ELEMENT_CHECK=$($PSQL "SELECT atomic_number FROM elements WHERE name='$1' OR symbol='$1';")
        
        if [[ -z $ELEMENT_CHECK ]]
        then
          echo "I could not find that element in the database."

        else

          echo $($PSQL "SELECT * FROM elements FULL JOIN properties USING(atomic_number) FULL JOIN types USING(type_id) WHERE atomic_number = $ELEMENT_CHECK") | while IFS='|' read TYPE_ID ATOMIC_NUMBER SYMBOL NAME ATOMIC_MASS MELTING_POINT BOILING_POINT TYPE
          do
            echo "The element with atomic number $ATOMIC_NUMBER is $NAME ($SYMBOL). It's a $TYPE, with a mass of $ATOMIC_MASS amu. $NAME has a melting point of $MELTING_POINT celsius and a boiling point of $BOILING_POINT celsius."
          done
        fi
      
      fi


    fi



fi
