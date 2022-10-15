const paginationFields = (page, perPage) => {
    const limit = perPage || 10;
    let offset = 0;
    if (page !== 1) offset = page * perPage - perPage;
    return { limit, offset };
  };
  
  const paginationResults = (records, page, perPage) => {
    const { count, rows } = records;
    const totalPages = Math.ceil(count / perPage);
  
    return {
      totalItems: count,
      totalPages,
      currentPage: parseInt(page),
      items: rows,
    };
  };
  
  export { paginationFields, paginationResults };
  
  