CREATE TABLE `product` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`category` varchar(255) NOT NULL,
	`price` decimal(10,2) NOT NULL,
	`stock` int NOT NULL,
	`created_at` datetime NOT NULL,
	CONSTRAINT `product_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `sales` (
	`id` int AUTO_INCREMENT NOT NULL,
	`product_id` int NOT NULL,
	`quantity` int NOT NULL,
	`total_amount` decimal(10,2) NOT NULL,
	`sale_date` datetime NOT NULL,
	`customer_name` varchar(255) NOT NULL,
	`region` varchar(255) NOT NULL,
	CONSTRAINT `sales_id` PRIMARY KEY(`id`)
);
