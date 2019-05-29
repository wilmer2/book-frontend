import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Img from 'react-image';
import bookCardImage from '@/images/bookCardImage.jpeg';
import withLinkStopPropagation from '@/app/components/wrappers/WithLinkStopPropagationEnhancer';

const BookCard = styled.div`
  cursor: pointer;
  max-width: 260px;
  border: 1px solid #DFDFDF;
`;

const Description = styled.p`
  margin-top: 5px;
`;

const LinkUser = styled.a`
  color: #6f6f6f;
  font-size: 15px;
  height: 18px;
  line-height: 18px;
`;

const SocialMeta = styled.div`
  display: flex;
  color: #6f6f6f;
  font-size 12px;
  max-height: 45px;
  overflow: hidden;
  margin-bottom: 0;
  margin-top: 3px;
`;

const IconContainer = styled.span`
  margin-left: 5px;
`;

const Counter = styled.span`
  margin-left: 2px;
`;

class BookItem extends PureComponent {
  handleOnClickBook = () => {
    this.props.onClickBook(this.props.book.id);
  }

  render() {
    const book = this.props.book;
    const user = this.props.book.user;

    return (
      <BookCard>
        <div className="card" onClick={this.handleOnClickBook}>
          <div className="card-image">
            <figure className="image is-4by3">
              <Img 
                alt={book.name}
                src={[
                  book.imageUrl,
                  bookCardImage
                ]}
              />
            </figure>
          </div>
          <div className="card-content">
            <div className="media">
              <div className="media-content">
                <p className="title is-6">{book.name}</p>
                <p className="subtitle is-6">
                  <LinkUser 
                    href={`/user/${user.id}`} 
                    onClick={this.props.onClickLink}
                  >
                    by {user.name}
                  </LinkUser>
                </p>
              </div>
            </div>
            <SocialMeta>
              <span>
                <i className="fas fa-eye fa-fw"></i>
                <Counter>
                  {book.views}
                </Counter>
              </span>
              <IconContainer>
                <i className="fas fa-thumbs-up fa-fw"></i>
                <Counter>
                  {book.likeCount}
                </Counter>
              </IconContainer>
            </SocialMeta>
            <div className="content">
              <Description>
                {book.description}
              </Description>
            </div>
          </div>
        </div>
      </BookCard>
    );
  }
}

BookItem.propTypes = {
  book: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    views: PropTypes.number.isRequired,
    likeCount: PropTypes.number.isRequired,
    imageUrl: PropTypes.string,
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  onClickBook: PropTypes.func.isRequired,
};

export default withLinkStopPropagation(BookItem);
