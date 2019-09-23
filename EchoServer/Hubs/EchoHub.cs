using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace EchoServer.Hubs
{
    public class EchoHub : Hub<IEchoClient>
    {
        public override async Task OnConnectedAsync()
        {
            await Clients.Caller.Ping("ping 0");
        }
        public Task<string> Ping(string ping)
        {
            (var type, var id) = ParseMessage(ping);

            return Task.FromResult($"pong {id}");
        }

        public async Task Pong(string pong)
        {
            (var type, var id) = ParseMessage(pong);
            await Task.Delay(3000);
            await Clients.Caller.Ping($"ping {id + 1}");
        }

        private (string type, int id) ParseMessage(string message)
        {
            message = message ?? throw new ArgumentNullException(nameof(message));
            var arr = message.Split(' ');
            if (arr.Length != 2)
            {
                throw new ArgumentOutOfRangeException($"ping/pong message is not valid: {message}");
            }
            var p = arr[0];
            var idstr = arr[1];
            if (int.TryParse(idstr, out var id))
            {
                id++;
            }
            else
            {
                throw new ArgumentOutOfRangeException($"can not get id from message:{idstr}| {message}");
            }

            return (p, id);
        }
    }
}