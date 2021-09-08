using System;
using System.Linq.Expressions;
using Core.Entities;
namespace Core.Specifications
{
    public class ProductsWithTypesAndBrandsSpecifcation : BaseSpecification<Product>
    {
        public ProductsWithTypesAndBrandsSpecifcation()
        {
            AddInclude(x => x.ProductType);
            AddInclude(x => x.ProductBrand);
        }

        public ProductsWithTypesAndBrandsSpecifcation(int id) : base(x => x.Id == id)
        {
            AddInclude(x => x.ProductType);
            AddInclude(x => x.ProductBrand);
        }
    }
}