import React, { Component } from 'react'
import { detailProduct, storeProducts } from './data';

const ProductContext = React.createContext();
//Provider
// Consumer

class ProductProvider extends Component {
  state = {
    product: [],
    detailProduct: detailProduct,
    };
    componentDidMount() {
        this.setProduct();
    }
    setProduct = () => {
        let tempProducts = [];
        storeProducts.forEach(item => {
            const singleItem = { ...item };
            tempProducts = [...tempProducts, singleItem];
        })
        this.setState(() => {
            return { product: tempProducts }
        });
    }

    getItem = (id) => {
        const product = this.state.product.find(item => item.id === id);
        return product;
    }
  handleDetail = (id) => {
      const product = this.getItem(id);
      this.setState(() => {
          return {detailProduct:product}
      })
  };
  addCart = (id) => {
      console.log(`hello from add to cart ${ id }`);
    };

  render() {
    return (
      <ProductContext.Provider
        value={{
                ...this.state,
            handleDetail:this.handleDetail,
            addCart:this.addCart
        }}
      >
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}
const ProductConsumer = ProductContext.Consumer;
export { ProductProvider, ProductConsumer };
