namespace KeepSpy.Shared.Models
{
    public class Paged<T>
    {
        public T[] Items { get; set; }

        public Pager Pager { get; set; }
    }

    public class Pager
    {
        public int Take { get; set; }

        public int Pages { get; set; }

        public int Total { get; set; }

        public int Current { get; set; }
    }

    public class PagerQuery
    {
        public int Page { get; set; }

        public int Take { get; set; }
    }
}