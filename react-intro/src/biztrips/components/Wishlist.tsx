import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
// deconstruct props
export default function Wishlist() {
  // as constant variant 2

  const empty = (
    <tr>
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-ignore */}
      <td colSpan="4">
        {" "}
        <p className="alert alert-info">Wishlist of Businesstrips is empty</p>
      </td>
    </tr>
  );

  return (
    <div className="container">
      <React.Fragment>
        <div className="row">
          <div className="col-sm-12">
            <div className="card table-responsive">
              <table className="table table-hover shopping-cart-wrap">
                <thead className="text-muted">
                  <tr>
                    <th scope="col">Trip</th>
                    {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                    {/* @ts-ignore */}
                    <th scope="col" width="200">
                      Title
                    </th>
                    {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                    {/* @ts-ignore */}
                    <th scope="col" width="200">
                      Like
                    </th>
                    {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                    {/* @ts-ignore */}
                    <th scope="col" width="120">
                      Description
                    </th>
                    {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                    {/* @ts-ignore */}
                    <th scope="col" width="200" className="text-right">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody />
                <tfoot>
                  <tr>
                    <th align="right" scope="col" />
                    <th scope="col" />
                    <th scope="col" />
                    <th scope="col">
                      <button className="btn btn-outline-danger">
                        empty List
                      </button>
                    </th>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </React.Fragment>
    </div>
  );
}

function Wish() {
  // deconstruct props

  // props

  return (
    <tr>
      <td>
        <figure className="media">
          <div className="img-wrap">
            <img
              className="img-thumbnail img-xs"
              src={"images/items/" + ".jpg"}
              alt="img"
            />
          </div>
          <figcaption className="media-body">
            <h6 className="h6" />
            <dl className="dlist-inline small">
              <dt>Start: </dt>
              <dd />
            </dl>
            <dl className="dlist-inline small">
              <dt>End: </dt>
              <dd />
            </dl>
          </figcaption>
        </figure>
      </td>
      <td>
        <span className="media-body">
          <div />
        </span>
      </td>
      <td>
        <span className="media-body">
          <div>
            <button className="btn btn-outline-success fa fa-heart fa-xs" />
          </div>
        </span>
      </td>

      <td className="price-wrap price" />
      <td className="text-right">
        <button
          className="btn btn-outline-danger"
          // App deleteItem
        >
          delete Trip
        </button>
      </td>
    </tr>
  );
}
