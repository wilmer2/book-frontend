import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Img from 'react-image';
import bookImage from '@/images/bookImage.jpeg';
import withLinkStopPropagation from '@/app/components/wrappers/WithLinkStopPropagationEnhancer';

const BookCard = styled.div`
  border: 2px solid #E0E0E0;
  border-radius: 8px;
  cursor: pointer;
  @media (max-width: 600px) {
    width: 100%;
  }
`;

const MainContent = styled.div`
  display: flex;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const Title = styled.h3`
  margin-top: 5px;
  font-size: 1.5rem;
  @media (max-width: 500px) {
    margin-top: 8px;
  }
`;

const Description = styled.p`
  width: 400px;
  font-size: 15px;
  margin-top: 2px;
  padding-right: 10px;
  padding-bottom: 10px;

  @media (max-width: 600px) {
    padding-right: 0.90rem;
    padding-bottom: 0.70rem;
    margin-top: 6px;
    width: auto;
  }
`;


const ImgContainer = styled.figure`
  padding: 0;
  margin-left: 10px;

  @media(max-width: 600px) {
    padding-top: 30px;
    padding-left 36px;
  }

  @media (max-width: 400px) {
    padding: 20px 23px 0 25px;
    margin: 0; 
  }
`;

const InfoContainer = styled.div`
  @media (max-width: 600px) {
    border-top: 2px solid #E0E0E0;
    padding: 0 0 10px 20px !important; 
  }
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
      <BookCard onClick={this.handleOnClickBook}>
        <MainContent className="columns">
          <div className="column">
            <ImgContainer>
              <Img 
                height={225}
                width={144}
                alt={book.name}
                src={[
                  book.imageUrl,
                  bookImage
                ]}
              />
            </ImgContainer>
          </div>
          <InfoContainer className="column">
            <Title>
              {book.name}
            </Title>
            <div>
              <LinkUser 
                href={`/user/${user.id}`} 
                onClick={this.props.onClickLink}
              >
                by {user.name}
              </LinkUser>
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
            <Description>
              {book.description}
            </Description>
          </InfoContainer>
        </MainContent>
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
