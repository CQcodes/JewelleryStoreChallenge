namespace JewelleryStore.Model.Options
{
    public interface IJwtSettings
    {
        string Secret { get; set; }
    }

    public class JwtSettings: IJwtSettings
    {
        public string Secret { get; set; }
    }
}
