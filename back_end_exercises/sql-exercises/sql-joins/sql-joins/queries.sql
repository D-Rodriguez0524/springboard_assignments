-- write your queries here

-- first query
SELECT * 
FROM owners o
FULL OUTER JOIN vehicles v
ON o.id = v.owner_id;

-- second query
SELECT o.first_name , o.last_name, COUNT (owner_id) 
FROM owners o                                                                                                                        FROM owners o
JOIN vehicles v
ON o.id = v.owner_id
GROUP BY (first_name,last_name)
ORDER BY first_name;

-- third query
SELECT o.first_name, o.last_name, ROUND(AVG(price)) AS average_price , COUNT (owner_id)
FROM owners o 
JOIN vehicles v 
ON o.id= v.owner_id
GROUP BY (first_name,last_name)
HAVING COUNT (owner_id) > 1 AND ROUND(AVG(price)) > 10000
ORDER BY first_name DESC;