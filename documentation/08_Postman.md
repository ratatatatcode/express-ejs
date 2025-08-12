# What is Postman?

**Postman** is a tool for testing APIs. It lets you send HTTP requests to your backend and see the responses without building the frontend yet.  
Perfect for checking if your **Sign In** and **Sign Up** routes work before connecting them to your app.

```js
// Example route from your project
router.post("/api/auth/signup", authController.signup);
```

---

## Will I be able to test my backend without a frontend?

Yes — with Postman, you can send requests directly to your backend and verify that your routes work correctly.  
Postman acts like your frontend during testing — you can send data, receive responses, and debug without writing any UI code first.

---

## Setup

### 1. Download Postman
- Go to [https://www.postman.com/downloads/](https://www.postman.com/downloads/).
- Download the desktop version for your operating system.
- Install and open Postman (account optional).

### 2. Start Your Server
```bash
npm run dev
```
If your `.env` file has:
```ini
PORT=3000
```
Then your API will be available at:
```arduino
http://localhost:3000
```

---

## Testing **Sign Up** Route

**Route:**
```js
POST /api/auth/signup
```

**Controller:**
```js
exports.signup = async (req, res) => {
  const { name, email, password } = req.body;
  return res.status(201).json({ message: "Account created successfully" });
};
```

**Steps in Postman:**
1. Click **New → HTTP Request**.
2. Set method to **POST**.
3. Enter:
```bash
http://localhost:3000/api/auth/signup
```
4. Go to the **Body** tab → select **raw** → choose **JSON**.
5. Enter:
```json
{
  "name": "James",
  "email": "james@example.com",
  "password": "test1234"
}
```
6. Click **Send**.  
You should get:
```json
{
  "message": "Account created successfully"
}
```
If you see `"The email address is already in use"`, change the email to a new one.

---

## Testing **Sign In** Route

**Route:**
```js
POST /api/auth/signin
```

**Controller:**
```js
exports.signin = async (req, res) => {
  const { email, password } = req.body;
  return res.status(200).json({ message: "Login successfully" });
};
```

**Steps in Postman:**
1. Create another request in the same collection.
2. Set method to **POST**.
3. Enter:
```bash
http://localhost:3000/api/auth/signin
```
4. In the **Body** tab → select **raw** → choose **JSON**.
5. Enter:
```json
{
  "email": "james@example.com",
  "password": "test1234"
}
```
6. Click **Send**.  
You should get:
```json
{
  "message": "Login successfully"
}
```
If you get `"Invalid email or password"`, double-check that the credentials match a registered account.
