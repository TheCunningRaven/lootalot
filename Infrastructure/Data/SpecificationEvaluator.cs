using System.Linq;
using Core.Entities;
using Core.Specifications;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data
{
    public class SpecificationEvaluator<TEntity> where TEntity : BaseEntity
    {
        public static IQueryable<TEntity> GetQuery(IQueryable<TEntity> inputQuery, ISpecification<TEntity> spec)
        {
            var query = inputQuery;
            
            if (spec.Criteria != null)
            {
                query = query.Where(spec.Criteria); // e.g p => p.ProductTypeId == id
            }
            if (spec.OrderBy != null)
            {
                query = query.OrderBy(spec.OrderBy); // e.g p => p.ProductTypeId == id
            }
            if (spec.OrderByDesc != null)
            {
                query = query.OrderByDescending(spec.OrderByDesc); // e.g p => p.ProductTypeId == id
            }
            if (spec.isPaging) //order matters here, we only want to page after filtering
            {
                query = query.Skip(spec.Skip).Take(spec.Take); // e.g p => p.ProductTypeId == id
            }

            query = spec.Includes.Aggregate(query, (current, include)=> current.Include(include));

            return query;
        }
    }
}