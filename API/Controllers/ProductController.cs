using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs.Product;
using API.Entities;
using API.Services.ProductService;
using Microsoft.AspNetCore.Authorization;
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

        [Authorize]
        [HttpDelete]
        public async Task<ActionResult> Delete(int id)
        {
            var result = await _productService.DeleteProduct(id);
            if (result == null)
            {
                return NotFound();
            }
            else if (result == true)
            {
                return StatusCode(204);
            }
            return BadRequest("Problem occurred while trying to save changes.");

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

        [Authorize]
        [HttpPost]
        public async Task<ActionResult<ProductDTO>> Create(CreateProductDTO productDTO)
        {
            var product = await _productService.CreateProduct(productDTO);
            return CreatedAtRoute("GetProduct", new { id = product.Id }, product);
        }
    }
}