using System;
using System.ComponentModel.DataAnnotations;

namespace KeepSpy.Shared.Domain
{
    public interface IHasId
    {
        object Id { get; }
    }

    public interface IHasId<out TKey> : IHasId
        where TKey: IEquatable<TKey>
    {
        new TKey Id { get; }
    }
    
    public abstract class HasId<TKey> : IHasId<TKey>
        where TKey: IEquatable<TKey>
    {
        [Key, Required]
        public virtual TKey Id { get; set; }

        object IHasId.Id => Id;
    }
}