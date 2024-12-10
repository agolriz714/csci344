-- Exercise 1 (done for you): Selecting all columns
SELECT * FROM users;



-- Exercise 2 (done for you): Selecting some columns
SELECT id, first_name, last_name 
FROM users;



-- Exercise 3: Sorting
SELECT id, first_name, last_name 
FROM users;
ORDER BY
    last_name;




-- Exercise 4: Filtering
SELECT id, user_id,image_url
FROM posts
WHERE user_id =26;



-- Exercise 5: Filtering with logical operators
SELECT id, user_id,image_url
FROM posts
WHERE user_id =26 OR user_id =12;



-- Exercise 6: Using functions in a select statement
SELECT COUNT(posts)
tutorial10-# FROM posts;



-- Exercise 7: Aggregating data
SELECT user_id, COUNT(comments) as comment_count
FROM comments
GROUP BY user_id
ORDER BY comment_count DESC;



-- Exercise 8: Joining: two tables
SELECT posts.id AS post_id, posts.image_url, posts.user_id, users.username, users.first_name, users.last_name
FROM posts
INNER JOIN users ON posts.user_id = users.id
WHERE posts.user_id IN (26, 12);



-- Exercise 9: More joining practice: two tables
SELECT posts.id , pub_date, following_id
FROM posts
INNER JOIN following ON posts.user_id = 26 AND following_id = 26
ORDER BY posts.id ASC;



-- Exercise 10: More joining practice: three tables (Optional)




-- Exercise 11: Inserting records
INSERT INTO bookmarks (post_id, user_id,timestamp)
VALUES (221, 26, now());
-- Switch first spot for target spot



-- Exercise 12: Deleting records
DELETE FROM bookmarks
where post_id = 221;



-- Exercise 13: Updating records
UPDATE users
set email ='knick2022@gmail.com'
WHERE id = 26;



-- Exercise 14: More Querying Practice (Optional)
