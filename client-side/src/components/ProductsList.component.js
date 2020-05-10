import React, { Component } from "react";
import Product from "./Product.component";
import axios from "axios";

const baseURL = process.env.baseURL || "http://localhost:5000";

class ProductList extends Component {
    constructor() {
        super();
        this.state = {
            products: [],
            depts: [],
            colors: [],
            price: "",
            color: "",
            dept: "",
            hasPriceFilter: false,
            hasDeptFilter: false,
            hasColorFilter: false,
        };
        this.handlePriceChange = this.handlePriceChange.bind(this);
        this.handleDeptChange = this.handleDeptChange.bind(this);
        this.handleColorChange = this.handleColorChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.clearFilters = this.clearFilters.bind(this);
    }

    componentDidMount() {
        axios
            .get(`${baseURL}/product`)
            .then((res) => this.setState({ products: res.data }))
            .then(() => {
                this.state.products.map((item) =>
                    this.setState((prevState) => ({
                        depts: [...prevState.depts, item.dept],
                    }))
                );

                this.setState((prevState) => ({
                    depts: prevState.depts.filter(
                        (item, i) => prevState.depts.indexOf(item) === i
                    ),
                }));

                this.setState((prevState) => ({
                    depts: prevState.depts.sort(),
                }));
            })
            .then(() => {
                this.state.products.map((item) =>
                    this.setState((prevState) => ({
                        colors: [...prevState.colors, item.color],
                    }))
                );

                this.setState((prevState) => ({
                    colors: prevState.colors.filter(
                        (item, i) => prevState.colors.indexOf(item) === i
                    ),
                }));

                this.setState((prevState) => ({
                    colors: prevState.colors.sort(),
                }));
            })
            .catch((err) => console.error(err));
    }

    handlePriceChange(event) {
        const { name, value } = event.target;
        value === "clear"
            ? this.setState({ hasPriceFilter: false })
            : this.setState({ hasPriceFilter: true });
        this.setState({ [name]: value });
    }

    handleDeptChange(event) {
        const { name, value } = event.target;
        value === "clear"
            ? this.setState({ hasDeptFilter: false })
            : this.setState({ hasDeptFilter: true });
        this.setState({ [name]: value });
    }

    handleColorChange(event) {
        const { name, value } = event.target;
        value === "clear"
            ? this.setState({ hasColorFilter: false })
            : this.setState({ hasColorFilter: true });
        this.setState({ [name]: value });
    }

    clearFilters() {
        this.setState({
            hasPriceFilter: false,
            hasDeptFilter: false,
            hasColorFilter: false,
            color: "",
            price: "",
            dept: "",
        });
    }

    handleSubmit(event) {
        event.preventDefault();
    }

    render() {
        if (this.state.products.length) {
            return (
                <div className="container">
                    <div>
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-check form-check-inline">
                                <input
                                    className="form-check-input"
                                    name="price"
                                    type="radio"
                                    value="0 - 500"
                                    checked={this.state.price === "0 - 500"}
                                    onChange={this.handlePriceChange}
                                />
                                <label className="form-check-label">
                                    ₹0 - ₹500
                                </label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input
                                    className="form-check-input"
                                    name="price"
                                    type="radio"
                                    value="501 - 2000"
                                    checked={this.state.price === "501 - 2000"}
                                    onChange={this.handlePriceChange}
                                />
                                <label className="form-check-label">
                                    ₹501 - ₹2000
                                </label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input
                                    className="form-check-input"
                                    name="price"
                                    type="radio"
                                    value="2001 - 5000"
                                    checked={this.state.price === "2001 - 5000"}
                                    onChange={this.handlePriceChange}
                                />
                                <label className="form-check-label">
                                    ₹2001 - ₹5000
                                </label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input
                                    className="form-check-input"
                                    name="price"
                                    type="radio"
                                    value=">5000"
                                    checked={this.state.price === ">5000"}
                                    onChange={this.handlePriceChange}
                                />
                                <label className="form-check-label">
                                    >₹5000
                                </label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="price"
                                    value="clear"
                                    onChange={this.handlePriceChange}
                                    checked={this.state.price === "clear"}
                                />
                                <label className="form-check-label">
                                    Clear Price Filter
                                </label>
                            </div>
                            <div className="form-group">
                                <select
                                    className="form-control"
                                    name="dept"
                                    onChange={this.handleDeptChange}
                                    value={this.state.dept}
                                >
                                    <option value="" selected disabled hidden>
                                        Choose Department Filter
                                    </option>
                                    <option value="clear">
                                        Clear Dept Filter
                                    </option>
                                    {this.state.depts.map((dept) => (
                                        <option value={dept}>{dept}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <select
                                    className="form-control"
                                    name="color"
                                    onChange={this.handleColorChange}
                                    value={this.state.color}
                                >
                                    <option value="" selected disabled hidden>
                                        Choose Color Filter
                                    </option>
                                    <option value="clear">
                                        Clear Color Filter
                                    </option>
                                    {this.state.colors.map((color) => (
                                        <option value={color}>{color}</option>
                                    ))}
                                </select>
                                {this.state.hasColorFilter ||
                                this.state.hasPriceFilter ||
                                this.state.hasDeptFilter ? (
                                    <button
                                        className="btn btn-sm btn-success"
                                        onClick={this.clearFilters}
                                    >
                                        Clear all filters
                                    </button>
                                ) : (
                                    " "
                                )}
                            </div>
                        </form>
                    </div>
                    <div id="products-list">
                        {this.state.hasPriceFilter
                            ? this.state.price.match(/\d+/g)[1]
                                ? this.state.hasDeptFilter
                                    ? this.state.hasColorFilter
                                        ? this.state.products
                                              .filter(
                                                  (item) =>
                                                      Number(item.price) >
                                                          Number(
                                                              this.state.price.match(
                                                                  /\d+/g
                                                              )[0]
                                                          ) &&
                                                      Number(item.price) <
                                                          Number(
                                                              this.state.price.match(
                                                                  /\d+/g
                                                              )[1]
                                                          ) &&
                                                      item.dept ===
                                                          this.state.dept &&
                                                      item.color ===
                                                          this.state.color
                                              )
                                              .map((product) => (
                                                  <Product
                                                      key={product._id}
                                                      product={product}
                                                  />
                                              ))
                                        : this.state.products
                                              .filter(
                                                  (item) =>
                                                      Number(item.price) >
                                                          Number(
                                                              this.state.price.match(
                                                                  /\d+/g
                                                              )[0]
                                                          ) &&
                                                      Number(item.price) <
                                                          Number(
                                                              this.state.price.match(
                                                                  /\d+/g
                                                              )[1]
                                                          ) &&
                                                      item.dept ===
                                                          this.state.dept
                                              )
                                              .map((product) => (
                                                  <Product
                                                      key={product._id}
                                                      product={product}
                                                  />
                                              ))
                                    : this.state.hasColorFilter
                                    ? this.state.products
                                          .filter(
                                              (item) =>
                                                  Number(item.price) >
                                                      Number(
                                                          this.state.price.match(
                                                              /\d+/g
                                                          )[0]
                                                      ) &&
                                                  Number(item.price) <
                                                      Number(
                                                          this.state.price.match(
                                                              /\d+/g
                                                          )[1]
                                                      ) &&
                                                  item.color ===
                                                      this.state.color
                                          )
                                          .map((product) => (
                                              <Product
                                                  key={product._id}
                                                  product={product}
                                              />
                                          ))
                                    : this.state.products
                                          .filter(
                                              (item) =>
                                                  Number(item.price) >
                                                      Number(
                                                          this.state.price.match(
                                                              /\d+/g
                                                          )[0]
                                                      ) &&
                                                  Number(item.price) <
                                                      Number(
                                                          this.state.price.match(
                                                              /\d+/g
                                                          )[1]
                                                      )
                                          )
                                          .map((product) => (
                                              <Product
                                                  key={product._id}
                                                  product={product}
                                              />
                                          ))
                                : this.state.hasDeptFilter
                                ? this.state.hasColorFilter
                                    ? this.state.products
                                          .filter(
                                              (item) =>
                                                  Number(item.price) >
                                                      Number(
                                                          this.state.price.match(
                                                              /\d+/g
                                                          )[0]
                                                      ) &&
                                                  item.dept ===
                                                      this.state.dept &&
                                                  item.color ===
                                                      this.state.color
                                          )
                                          .map((product) => (
                                              <Product
                                                  key={product._id}
                                                  product={product}
                                              />
                                          ))
                                    : this.state.products
                                          .filter(
                                              (item) =>
                                                  Number(item.price) >
                                                      Number(
                                                          this.state.price.match(
                                                              /\d+/g
                                                          )[0]
                                                      ) &&
                                                  item.dept === this.state.dept
                                          )
                                          .map((product) => (
                                              <Product
                                                  key={product._id}
                                                  product={product}
                                              />
                                          ))
                                : this.state.hasColorFilter
                                ? this.state.products
                                      .filter(
                                          (item) =>
                                              Number(item.price) >
                                                  Number(
                                                      this.state.price.match(
                                                          /\d+/g
                                                      )[0]
                                                  ) &&
                                              item.color === this.state.color
                                      )
                                      .map((product) => (
                                          <Product
                                              key={product._id}
                                              product={product}
                                          />
                                      ))
                                : this.state.products
                                      .filter(
                                          (item) =>
                                              Number(item.price) >
                                              Number(
                                                  this.state.price.match(
                                                      /\d+/g
                                                  )[0]
                                              )
                                      )
                                      .map((product) => (
                                          <Product
                                              key={product._id}
                                              product={product}
                                          />
                                      ))
                            : this.state.hasDeptFilter
                            ? this.state.hasColorFilter
                                ? this.state.products
                                      .filter(
                                          (product) =>
                                              product.dept ===
                                                  this.state.dept &&
                                              product.color === this.state.color
                                      )
                                      .map((product) => (
                                          <Product
                                              key={product._id}
                                              product={product}
                                          />
                                      ))
                                : this.state.products
                                      .filter(
                                          (product) =>
                                              product.dept === this.state.dept
                                      )
                                      .map((product) => (
                                          <Product
                                              key={product._id}
                                              product={product}
                                          />
                                      ))
                            : this.state.hasColorFilter
                            ? this.state.products
                                  .filter(
                                      (product) =>
                                          product.color === this.state.color
                                  )
                                  .map((product) => (
                                      <Product
                                          key={product._id}
                                          product={product}
                                      />
                                  ))
                            : this.state.products.map((product) => (
                                  <Product
                                      key={product._id}
                                      product={product}
                                  />
                              ))}
                    </div>
                </div>
            );
        } else {
            return <div>LOADING...</div>;
        }
    }
}

export default ProductList;
