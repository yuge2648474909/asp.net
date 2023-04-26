use client_bridgewise;
DROP TABLE IF EXISTS `image`;
CREATE TABLE `image` (
  id INT AUTO_INCREMENT PRIMARY KEY,
  image_uuid VARCHAR(255) NOT NULL,
  image_name VARCHAR(255) NOT NULL,
  update_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,  
  resource_id INT NOT NULL,
  type VARCHAR(255) NOT NULL,
  relative_url  VARCHAR(255) NOT NULL,
  absolute_url VARCHAR(255) NOT NULL,
  image_size VARCHAR(255) ,
  foreign key (resource_id) references resource (id)
)engine=InnoDB charset=utf8mb4;