using API.Data;
using API.DTOs.Product;
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
                ImageUrl = prod.ImageUrl,
                RestaurantId = prod.RestaurantId,
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
                ImageUrl = product.ImageUrl,
                RestaurantId = product.RestaurantId
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

        public async Task<ProductDTO> CreateProduct(CreateProductDTO productDTO)
        {
            var product = new Product()
            {
                Type = productDTO.Type,
                Title = productDTO.Title,
                Description = productDTO.Description,
                Price = productDTO.Price,
                ImageUrl = productDTO.ImageUrl,
                RestaurantId = productDTO.RestaurantId
            };

            await _storeContext.Products.AddAsync(product);
            await _storeContext.SaveChangesAsync();

            return new ProductDTO()
            {
                Id = product.Id,
                Type = product.Type,
                Title = product.Title,
                Description = product.Description,
                Price = product.Price,
                ImageUrl = product.ImageUrl,
                RestaurantId = product.RestaurantId
            };
        }

        public async Task<bool?> DeleteProduct(int id)
        {
            var product = await _storeContext.Products.FindAsync(id);
            if (product == null)
            {
                return null;
            }

            _storeContext.Products.Remove(product);
            var result = await _storeContext.SaveChangesAsync() > 0;
            if (result)
            {
                return true;
            }
            
            return false;
        }
    }
}
