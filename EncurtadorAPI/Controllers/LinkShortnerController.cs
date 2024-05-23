using Microsoft.AspNetCore.Mvc;
using Newtonsoft;
using Newtonsoft.Json;
using System.Net;
using System.Text;
using System.Text.Json.Serialization;
using System.Web;
using System.Xml;

namespace EncurtadorAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class LinkShortnerController : Controller
    {
        //substitua pelo seu token!
        private static readonly string BitlyToken = "!";

        [HttpGet("Link-Shortner")]
        public async Task<IActionResult> LinkSortner(string urlOriginal)
        {

            HttpClient client = new HttpClient();
            string data = string.Format("https://api-ssl.bitly.com/v4/shorten", BitlyToken, urlOriginal);

            client.DefaultRequestHeaders.Add("Authorization", $"Bearer {BitlyToken}");

            var requestData = new
            {
                long_url = urlOriginal
            };

            var content = new StringContent(JsonConvert.SerializeObject(requestData), Encoding.UTF8, "application/json");

            HttpResponseMessage response = await client.PostAsync("https://api-ssl.bitly.com/v4/shorten", content);

            if(response.IsSuccessStatusCode)
            {
                string responseBody = await response.Content.ReadAsStringAsync();
                dynamic responseJson = JsonConvert.DeserializeObject(responseBody);

                string shortUrl = responseJson.link;
                return Ok(new { shortUrl });
            }
            else
            {
                string errorResponse = await response.Content.ReadAsStringAsync();
                return StatusCode((int)response.StatusCode, errorResponse);
            }
        }
    }
}
