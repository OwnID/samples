using System.Security.Cryptography;
using System.Text;
using CustomCSharpWepApi.DAL;
using CustomCSharpWepApi.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
namespace CustomCSharpWepApi.Controllers;

[EnableCors]
[ApiController]
[Route("[controller]")]
public class UsersController : ControllerBase
{

    [HttpPost("login")]
    public Task<ActionResult<LoggedInResponse>> Login(UserModel userModel)
    {
        try
        {
            var userExists = UserPool.Instance.Login(userModel);
            return Task.FromResult<ActionResult<LoggedInResponse>>(Ok(new LoggedInResponse
            {
                Logged = userExists,
                Error = !userExists ? "Check your credentials" : null
            }));
        }
        catch (Exception e)
        {
            return Task.FromResult<ActionResult<LoggedInResponse>>(Ok(new LoggedInResponse
            {
                Logged = false,
                Error = e.Message
            }));
        }
    }

    [HttpPost("register")]
    public Task<ActionResult<RegisterResponse>> Register(UserModel userModel)
    {
        try
        {
            var created = UserPool.Instance.Register(userModel);
            return Task.FromResult<ActionResult<RegisterResponse>>
            (Ok(new RegisterResponse
            {
                Created = created,
                Error = !created ? "User already exists" : null
            }));
        }
        catch (Exception e)
        {
            return Task.FromResult<ActionResult<RegisterResponse>>
            (Ok(new RegisterResponse
            {
                Created = false,
                Error = e.Message
            }));
        }
    }

    [HttpPost("getSessionByLoginId")]
    public async Task<ActionResult<OwnIDSessionResponse>> GetSessionByLoginId(UserModel userModel)
    {
        var user = UserPool.Instance.Get(userModel);
        if (user == null)
            return Ok(new NoUserConnectionsResponse {ErrorCode = StatusCodes.Status404NotFound});
        HMACSHA256 hashObject = new HMACSHA256(Encoding.UTF8.GetBytes("secret"));
        var signature = hashObject.ComputeHash(Encoding.UTF8.GetBytes(user.LoginId));
        var encodedSignature = Convert.ToBase64String(signature);
        return Ok(new OwnIDSessionResponse {token = encodedSignature});
    }

    [HttpPost("getOwnIDDataByLoginId")]
    public async Task<ActionResult<object>> GetOwnIdDataByLoginId(UserModel userModel)
    {
        var user = UserPool.Instance.Get(userModel);
        if (user == null)
            return Ok(new NoUserConnectionsResponse {ErrorCode = StatusCodes.Status404NotFound});
        return Ok(new OwnIDDataResponse {OwnIdData = user.OwnIdData});
    }

    [HttpPost("setOwnIDDataByLoginId")]
    public async Task<ActionResult<object>> SetOwnIdDataByLoginId(UserModel ownIdData)
    {
        UserPool.Instance.Update(ownIdData);
        return NoContent();
    }
}