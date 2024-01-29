using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Services.ProductService;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductController : ControllerBase
    {
        private readonly IProductService _productService;

        public ProductController(IProductService productService) 
        {
            _productService = productService;
        }

        [HttpGet]
        public async Task<ActionResult<List<ProductDTO>>> Get() 
        {
            var products = await _productService.GetProducts();
            if (products == null)
            {
                return NotFound();
            }
            return Ok(products);
        }

        [HttpGet("{id}", Name = "GetProduct")]
        public async Task<ActionResult<Product>> Get(int id) 
        {
            var product = await _productService.GetProduct(id);
            if (product == null)
            {
                return NotFound();
            }
            return Ok(product);
        }


        [HttpGet("filters")]
        public async Task<ActionResult<List<string>>> GetFilters()
        {
            var types = await _productService.GetTypesOfProducts();
            if (types == null)
            { 
                return NotFound();
            }
            return Ok(types);
        }

        [HttpPost]
        public async Task<ActionResult<ProductDTO>> Create(CreateProductDTO productDTO)
        {
            var product = await _productService.CreateProduct(productDTO);
            return CreatedAtRoute("GetProduct", new { id = product.Id }, product);
        }
    }
}