import ProductsService from "../services/ProductsService";

export const ProductsModule = {
  namespaced: true,

  state: {
    allProduct: null,
    allBackupProduct: null,
    displayProducts: null,
    apCount: null,
    perPage: null,
    searchParameter: {
      text: "",
      categoryId: 0,
      subCategoryId: 0,
      subSubCategoryId: 0,
      lowestAmount: 0,
      maximumAmount: 1000000000,
    }
  },
  mutations: {
    SET_ALL_BACKUP_PRODUCT(state, allProduct) {
      state.allBackupProduct = allProduct;
    },
    SET_ALL_PRODUCT(state, allProduct) {
      state.allProduct = allProduct;
      state.perPage = 9
    },
    SET_DISPLAY_PRODUCTS(state, displayProducts) {
      state.displayProducts = displayProducts;
    },
    SET_AP_COUNT(state, apCount) {
      state.apCount = apCount
    },
    SET_SEARCH_TEXT(state, searchText) {
      state.searchParameter.text = searchText;
    },
    SET_SEARCH_CATEGORY_ID(state, categoryId) {
      state.searchParameter.categoryId = categoryId;
    },
    SET_SEARCH_SUB_CATEGORY_ID(state, subCategoryId) {
      state.searchParameter.subCategoryId = subCategoryId;
    },
    SET_SEARCH_SUB_SUB_CATEGORY_ID(state, subSubCategoryId) {
      state.searchParameter.subSubCategoryId = subSubCategoryId;
    },
    SET_LOWEST_AMOUNT(state, lowestAmount) {
      state.searchParameter.lowestAmount = lowestAmount;
    },
    SET_MAXIMUM_AMOUNT(state, maximumAmount) {
      state.searchParameter.maximumAmount = maximumAmount;
    }

  },
  actions: {
    resetSearchParameter({ commit }) {
      commit("SET_SEARCH_TEXT", "");
      commit("SET_SEARCH_CATEGORY_ID", 0);
      commit("SET_SEARCH_SUB_CATEGORY_ID", 0);
      commit("SET_SEARCH_SUB_SUB_CATEGORY_ID", 0);
      commit("SET_LOWEST_AMOUNT", 0);
      commit("SET_MAXIMUM_AMOUNT", 1000000000);

    },
    setSearchParameter({ commit, dispatch }, searchParameter) {
      if (searchParameter.param.subSubCategoryId) {
        dispatch("setSearchSubSubCategoryId", searchParameter.param.subSubCategoryId)
      }
      else if (searchParameter.param.subCategoryId) {
        dispatch("setSearchSubCategoryId", searchParameter.param.subCategoryId)
      }
      else if (searchParameter.param.categoryId) {
        dispatch("setSearchCategoryId", searchParameter.param.categoryId)
      }
      if (searchParameter.query.q) {
        commit("SET_SEARCH_TEXT", searchParameter.query.q)
      }
      if (searchParameter.query.lo) {
        commit("SET_LOWEST_AMOUNT", searchParameter.query.lo)
      }
      if (searchParameter.query.hi) {
        commit("SET_MAXIMUM_AMOUNT", searchParameter.query.hi)
      }
    },
    setSearchText({ commit }, searchText) {
      commit("SET_SEARCH_TEXT", searchText);
    },
    setSearchCategoryId({ commit }, categoryId) {
      commit("SET_SEARCH_CATEGORY_ID", categoryId);
      commit("SET_SEARCH_SUB_CATEGORY_ID", 0);
      commit("SET_SEARCH_SUB_SUB_CATEGORY_ID", 0);
    },
    setSearchSubCategoryId({ commit }, subCategoryId) {
      commit("SET_SEARCH_CATEGORY_ID", 0);
      commit("SET_SEARCH_SUB_CATEGORY_ID", subCategoryId);
      commit("SET_SEARCH_SUB_SUB_CATEGORY_ID", 0);
    },
    setSearchSubSubCategoryId({ commit }, subSubCategoryId) {
      commit("SET_SEARCH_CATEGORY_ID", 0);
      commit("SET_SEARCH_SUB_CATEGORY_ID", 0);
      commit("SET_SEARCH_SUB_SUB_CATEGORY_ID", subSubCategoryId);
    },
    setLowestAmount({ commit }, lowestAmount) {
      commit("SET_LOWEST_AMOUNT", lowestAmount);
    },
    setMaximumAmount({ commit }, maximumAmount) {
      commit("SET_MAXIMUM_AMOUNT", maximumAmount);
    },
    async setAllBackupProduct({ commit }) {
      const allProduct = (await ProductsService.getAllProducts()).data;
      commit("SET_ALL_BACKUP_PRODUCT", allProduct)
    },
    async getAllBackupProduct({ dispatch, state }) {
      if (!state.allBackupProduct) {
        await dispatch("setAllBackupProduct")
      }
      return state.allBackupProduct;
    },
    async setAllProduct({ commit, state, dispatch }) {
      const allProduct = await dispatch("filterProducts");
      commit("SET_ALL_PRODUCT", allProduct);
      commit("SET_AP_COUNT", allProduct.length);
      const displayProducts = allProduct.slice(0, state.perPage);
      commit("SET_DISPLAY_PRODUCTS", displayProducts)
    },

    paginate({ commit, state }, currentPage) {
      const start = (currentPage - 1) * state.perPage;
      const displayProducts = state.allProduct.slice(start, start + state.perPage);
      commit("SET_DISPLAY_PRODUCTS", displayProducts);
    },
    async filterProducts({ state, dispatch }) {
      var allProduct = await dispatch("getAllBackupProduct");
      if (state.searchParameter.categoryId != 0) {
        allProduct = allProduct.filter(val => {
          return (
            val.CategoryId == state.searchParameter.categoryId);
        });
      }
      else if (state.searchParameter.subCategoryId != 0) {
        allProduct = allProduct.filter(val => {
          return (
            val.SubCategoryId == state.searchParameter.subCategoryId);
        });
      }
      else if (state.searchParameter.subSubCategoryId != 0) {
        allProduct = allProduct.filter(val => {
          return (
            val.SubSubCategoryId == state.searchParameter.subSubCategoryId);
        });
      }
      allProduct = allProduct.filter(val => {
        return (
          val.title.toLowerCase().includes(state.searchParameter.text.toLowerCase())
        );
      });
      return allProduct;
    },
  },
  modules: {
  }
}