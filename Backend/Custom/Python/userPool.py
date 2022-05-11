from base64 import b64decode

# Singleton


class UserPool:
    class __UserPool:
        def __init__(self):
            self.val = {}

        def register(self, user):
            if not self.get(user.login_id):
                self.val[user.login_id] = user
                return True
            return False

        def login(self, login_id, password):
            user = self.get(login_id)
            if user and user.password == password:
                return True
            return False

        def get(self, login_id):
            if login_id in self.val.keys():
                return self.val[login_id]

        def update(self, user):
            if self.get(user.login_id):
                self.val[user.login_id] = user
                return True
            return False

    instance = None

    def __init__(self):
        if not UserPool.instance:
            UserPool.instance = UserPool.__UserPool()

    def __getattr__(self, name):
        return getattr(self.instance, name)