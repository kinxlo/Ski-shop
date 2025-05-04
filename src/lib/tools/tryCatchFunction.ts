const tryCatchWrapper = async <T>(request: () => Promise<T>) => {
  try {
    return await request();
  } catch {
    //hanle error gracefully
  }
};

export default tryCatchWrapper;
