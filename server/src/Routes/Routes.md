Authentication
POST /auth/signup {role, name, email, phone, password}
POST /auth/login {email/phone, password}
GET /auth/me

User
GET /users/:id
PATCH /users/:id (any normal profile changes)
GET /users/me (send auth token)

Business
POST /businesses (create profile during onboarding)
GET /businesses/:id
GET /businesses?owner_id=
PUT /businesses/:id (any changes)
PATCH /businesses/:id (normal changes)

Children
POST   /children     (create child under parent)
GET    /children?parent_id=
GET    /children/:id
PUT    /children/:id
PATCH  /children/:id
DELETE /children/:id

Categories 
POST   /categories
GET    /categories   (list with nesting)
GET    /categories/:id
PUT    /categories/:id
DELETE /categories/:id

Tags
POST   /tags
GET    /tags
DELETE /tags/:id

Products
GET    /products?category=&tag=&search=&status=
GET    /products/:id
POST   /products     (admin create product)
PUT    /products/:id
PATCH  /products/:id  (toggle status active/inactive)

Product Assets
POST   /products/:id/assets  (upload to S3 → save record)
GET    /products/:id/assets
DELETE /products/:id/assets/:asset_id
PATCH  /products/:id/assets/:asset_id (update order or metadata)

Product Tags
POST   /products/:id/tags    {tag_ids: []}
DELETE /products/:id/tags/:tag_id


__________________________________________________________________
User Address --schema needed
POST /addresses   {user_id, line1, line2, city, state, zip, country, is_default}
GET  /addresses?user_id=
GET  /addresses/:id
PUT  /addresses/:id
DELETE /addresses/:id

Orders
POST   /orders    {items: [{product_id, qty}], address, delivery_estimate, payment_method}
GET    /orders?user_id=&status=
GET    /orders/:id  (also return all items in it)
PATCH  /orders/:id/status  (admin/user(cancel order) )

Order Items
GET    /orders/:id/items
GET    /order-items/:id

Delivery
GET /orders/:id/delivery (returns days windows)
PATCH /deliveries/:id/status (admin)

User Library
GET    /library          (for current user)
GET    /library/:product_id
POST   /library/add          (admin/manual add)
DELETE /library/:product_id    (remove access)
__________________________________________________________________


Payments
POST /payments/create-intent {order_id}
POST /payments/webhook (handle status)
GET    /payments/:order_id/status


Uploads/Media
POST   /upload/presign     {file_name, file_type} → returns presigned S3 URL

Notification
POST   /notifications/register   {expo_push_token}
POST   /notifications/send       {user_id, title, body}