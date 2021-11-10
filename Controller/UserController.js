let User = [];

class UserController {
    static async register(req, res) {
        const { name, email, password } = req.body;
        console.log(User);
        try {
            User.push({
                id: User.length + 1,
                email,
                password,
            });
            res.status(201).json({ name, email, password });
        } catch (error) {
            res.status(500).json({ error: error.message });
            console.log(error);
        }
    }

    static async login(req, res) {
        try {
            const { email, password } = req.body;
            const user = User.find((user) => user.email === email);
            if (!user) {
                return res.status(400).json({ error: 'Email/Password is not valid' });
            }
            if (user.password !== password) {
                return res.status(400).json({ error: 'Email/Password is not valid' });
            }
            return res.status(200).json({
                message: 'Login success',
                token: user.email,
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
            console.log(error);
        }
    }
}
module.exports = { UserController, User };