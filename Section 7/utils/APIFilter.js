class ApiFilters {
    constructor(query, queryObj) {
      this.query = query;
      this.queryObj = queryObj;
    }
  
    filter() {
      const queryCopy = { ...this.queryObj };
  
      // Removing fields from the query
      const removeFields = ["sort", "fields", "limit", "page"];
      removeFields.forEach((el) => delete queryCopy[el]);
  
      // Advance filter for price, ratings etc
      let queryStr = JSON.stringify(queryCopy);
      queryStr = queryStr.replace(
        /\b(gt|gte|lt|lte|in)\b/g,
        (match) => `$${match}`
      );
  
      this.query = this.query.find(JSON.parse(queryStr));
      return this;
    }
  
    sort() {
      if (this.queryObj.sort) {
        const sortBy = this.queryObj.sort.split(",").join(" ");
        this.query = this.query.sort(sortBy);
      } else {
        this.query = this.query.sort("-createdAt");
      }
      return this;
    }
  
    fields() {
      if (this.queryObj.fields) {
        const fields = this.queryObj.fields.split(",").join(" ");
        this.query = this.query.select(fields);
      }
      return this;
    }
  
    paginate() {
      const page = this.queryObj.page * 1 || 1; // Convert page to a number (default: 1)
      const limit = this.queryObj.limit * 1 || 100; // Convert limit to a number (default: 100)
      const skip = (page - 1) * limit; // Calculate the number of documents to skip
      this.query = this.query.skip(skip).limit(limit);
      return this;
    }
  }
  
  module.exports = ApiFilters;