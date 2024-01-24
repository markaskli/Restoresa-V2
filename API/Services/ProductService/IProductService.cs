using API.DTOs;

namespace API.Services.ProductService
{
    public interface IProductService
    {
        Task<ProductDTO?> GetProduct(int productId);
        Task<List<ProductDTO>?> GetProducts();
        Task<List<string>?> GetTypesOfProducts();
    }
}