
using System.Threading.Tasks;

namespace EchoServer.Hubs
{

    public interface IEchoClient
    {
        /// <summary>
        ///  ping the client
        /// </summary>
        Task Ping(string ping);
    }
}