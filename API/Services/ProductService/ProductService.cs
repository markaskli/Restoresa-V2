using API.Data;
using API.DTOs;
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Services.ProductService
{
    public class ProductService : IProductService
    {
        private readonly StoreContext _storeContext;
        public ProductService(StoreContext storeContext)
        {
            _storeContext = storeContext;
        }

        public async Task<List<ProductDTO>?> GetProducts()
        {
            var products = await _storeContext.Products.ToListAsync();
            if (!products.Any())
            {
                return null;
            }

            return products.Select(prod => new ProductDTO()
            {
                Id = prod.Id,
                Type = prod.Type,
                Title = prod.Title,
                Description = prod.Description,
                Price = prod.Price,
                ImageUrl = prod.ImageUrl
            }).ToList();
        }

        public async Task<ProductDTO?> GetProduct(int productId)
        {
            var product = await _storeContext.Products.FindAsync(productId);
            if (product == null)
            {
                return null;
            }

            return new ProductDTO()
            {
                Id = product.Id,
                Type = product.Type,
                Title = product.Title,
                Description = product.Description,
                Price = product.Price,
                ImageUrl = product.ImageUrl
            };
        }

        public async Task<List<string>?> GetTypesOfProducts()
        {
            var products = await _storeContext.Products.ToListAsync();
            if (!products.Any())
            {
                return null;
            }

            return products.Select(prod => prod.Type).Distinct().ToList();
        }
    }
}
