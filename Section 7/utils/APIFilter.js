class ApiFilters {
  // Step 1: Constructor to initialize the query and queryObj
  constructor(query, queryObj) {
    this.query = query; // The database query object
    this.queryObj = queryObj; // The query parameters from the request
  }

  // Step 2: Filter method to handle basic and advanced filtering
  filter() {
    const queryCopy = { ...this.queryObj }; // Create a copy of the query object

    // Step 3: Remove special fields (sort, fields, limit, page) from the query
    const removeFields = ["sort", "fields", "limit", "page"];
    removeFields.forEach((el) => delete queryCopy[el]);

    // Step 4: Advanced filtering for operators like gt, gte, lt, lte, in
    let queryStr = JSON.stringify(queryCopy); // Convert the query object to a string
    queryStr = queryStr.replace(
      /\b(gt|gte|lt|lte|in)\b/g,
      (match) => `$${match}` // Add $ prefix to operators (e.g., gt -> $gt)
    );

    // Step 5: Apply the filtered query to the database query
    this.query = this.query.find(JSON.parse(queryStr));
    return this; // Return the instance for method chaining
  }

  // Step 6: Sort method to handle sorting of results
  sort() {
    if (this.queryObj.sort) {
      // If sort parameter is provided, split and format it
      const sortBy = this.queryObj.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy); // Apply sorting
    } else {
      // Default sorting by createdAt in descending order
      this.query = this.query.sort("-createdAt");
    }
    return this; // Return the instance for method chaining
  }

  // Step 7: Fields method to handle field selection (projection)
  fields() {
    if (this.queryObj.fields) {
      // If fields parameter is provided, split and format it
      const fields = this.queryObj.fields.split(",").join(" ");
      this.query = this.query.select(fields); // Apply field selection
    }
    return this; // Return the instance for method chaining
  }

  // Step 8: Paginate method to handle pagination
  paginate() {
    const page = this.queryObj.page * 1 || 1; // Convert page to a number (default: 1)
    const limit = this.queryObj.limit * 1 || 100; // Convert limit to a number (default: 100)
    const skip = (page - 1) * limit; // Calculate the number of documents to skip
    this.query = this.query.skip(skip).limit(limit); // Apply pagination
    return this; // Return the instance for method chaining
  }
}

// Step 9: Export the ApiFilters class for use in other parts of the application
module.exports = ApiFilters;
