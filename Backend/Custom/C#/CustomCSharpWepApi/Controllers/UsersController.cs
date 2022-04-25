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
    public Task<ActionResult<OwnIDSessionResponse>> GetSessionByLoginId(UserModel userModel)
    {
        try
        {
            var token = UserPool.Instance.Get(userModel).LoginId;
            return Task.FromResult<ActionResult<OwnIDSessionResponse>>
                (Ok(new OwnIDSessionResponse {token = token}));
        }
        catch (Exception)
        {
            return Task.FromResult<ActionResult<OwnIDSessionResponse>>
                (Ok(new OwnIDSessionResponse {token = null}));
        }
    }

    [HttpPost("getOwnIDDataByLoginId")]
    public Task<ActionResult<Object>> GetOwnIdDataByLoginId(UserModel userModel)
    {
        try
        {
            var data = UserPool.Instance.Get(userModel).OwnIdData;
            return Task.FromResult<ActionResult<object>>
                (Ok(new OwnIDDataResponse {OwnIdData = data}));
        }
        catch (Exception)
        {
            return Task.FromResult<ActionResult<object>>
                (Ok(new NoUserConnectionsResponse {ErrorCode = StatusCodes.Status404NotFound}));
        }
    }

    [HttpPost("setOwnIDDataByLoginId")]
    public Task<ActionResult<Object>> SetOwnIdDataByLoginId(UserModel ownIdData)
    {
        try
        {
            UserPool.Instance.Update(ownIdData);
            return Task.FromResult<ActionResult<object>>(NoContent());
        }
        catch (Exception)
        {
            return Task.FromResult<ActionResult<object>>(Ok(null));
        }
    }
}