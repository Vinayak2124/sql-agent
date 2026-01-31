ALTER TABLE `product` MODIFY COLUMN `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP;--> statement-breakpoint
ALTER TABLE `sales` MODIFY COLUMN `sale_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP;--> statement-breakpoint
ALTER TABLE `sales` ADD CONSTRAINT `sales_product_id_product_id_fk` FOREIGN KEY (`product_id`) REFERENCES `product`(`id`) ON DELETE cascade ON UPDATE cascade;