using API.DTOs.Product;

namespace API.Services.ProductService
{
    public interface IProductService
    {
        Task<ProductDTO> CreateProduct(CreateProductDTO productDTO);
        Task<ProductDTO?> GetProduct(int productId);
        Task<List<ProductDTO>?> GetProducts();
        Task<List<string>?> GetTypesOfProducts();
        Task<bool?> DeleteProduct(int id);
    }
}