import React, { Component } from 'react';
import { fetchImages } from 'services/api';
import { SearchBar } from './SearchBar/SearchBar';
import { GlobalStyle } from './GlobalStyle';
import toast, { Toaster } from 'react-hot-toast';
import { ImageGallery } from './ImageGallery/ImageGallery';

export class App extends Component {
  state = {
    query: '',
    images: [],
    page: 1,
    totalHits: 0,
    loading: false,
    error: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.query !== prevState.query ||
      this.state.page !== prevState.page
    ) {
      this.upLoadImages();
    }
  }

  upLoadImages = async () => {
    try {
      this.setState({ loading: true, images: [] });
      const { hits, totalHits } = await fetchImages(
        this.state.query,
        this.state.page
      );
      if (!totalHits) {
        toast.error(
          '"Sorry, nothing was found for your request, please try something else."'
        );
      }

      this.setState(prevState => ({
        images: [...prevState.images, ...hits],
        totalHits: totalHits,
      }));
    } catch (error) {
      this.setState({ error: true });
    } finally {
      this.setState({ loading: false, error: false });
    }
  };

  handleSubmit = value => {
    this.setState({
      query: `${value}`,
      images: [],
      page: 1,
    });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    return (
      <>
        <SearchBar onSubmit={this.handleSubmit} />
        {this.state.totalHits > 0 && (
          <ImageGallery images={this.state.images} />
        )}
        <GlobalStyle />
        <Toaster position="top-right" reverseOrder={true} />
      </>
    );
  }
}
