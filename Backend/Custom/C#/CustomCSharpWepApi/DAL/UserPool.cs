using CustomCSharpWepApi.Models;

namespace CustomCSharpWepApi.DAL;

public sealed class UserPool
{
    private static UserPool? instance = null;
    private readonly Dictionary<string?, UserModel> _userPool;

    private UserPool()
    {
        _userPool = new Dictionary<string?, UserModel>();
    }

    public static UserPool Instance
    {
        get { return instance ??= new UserPool(); }
    }

    public bool Login(UserModel userModelToLogin)
    {
        UserModel userModel = Get(userModelToLogin);
        return userModel != null && userModel.Password.Equals(userModelToLogin.Password);
    }
    
    public bool Register(UserModel userModelToRegister)
    {
        if (_userPool.ContainsKey(userModelToRegister.LoginId)) return false;
        _userPool.Add(userModelToRegister.LoginId, userModelToRegister);
        return true;
    }

    public UserModel Get(UserModel userModelToGet)
    {
        if (!_userPool.ContainsKey(userModelToGet.LoginId)) return null!;
        return _userPool[userModelToGet.LoginId];
    }
    
    public bool Update(UserModel userModelToUpdate)
    {
        if (!_userPool.ContainsKey(userModelToUpdate.LoginId)) return false;
        _userPool[userModelToUpdate.LoginId] = userModelToUpdate;
        return true;
    }
}