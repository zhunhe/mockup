import React from 'react';
import styled from 'styled-components';

const footerLinks = [
  { href: "https://help.netflix.com/ko/node/412", text: "넷플릭스 소개" },
  { href: "https://help.netflix.com/ko", text: "고객 센터" },
  { href: "https://help.netflix.com/ko", text: "미디어 센터" },
  { href: "https://help.netflix.com/legal/termsofuse", text: "이용 약관" },
  { href: "https://help.netflix.com/legal/privacy", text: "개인정보" },
  { href: "https://help.netflix.com/legal/corpinfo", text: "회사정보" },
  { href: "https://help.netflix.com/legal/contactus", text: "문의하기" },
  { href: "https://help.netflix.com/legal/notices", text: "법적 고지" }
];

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterLinkContainer>
          <FooterLinkTitle>넷플릭스 대한민국</FooterLinkTitle>
          <FooterLinkContent>
            {footerLinks.map((link, index) => (
              <FooterLink key={index} href={link.href}>
                {link.text}
              </FooterLink>
            ))}
          </FooterLinkContent>
          <FooterDescriptionContainer>
            <FooterDescriptionRights>© Netflix RIGHTS RESERVED</FooterDescriptionRights>
          </FooterDescriptionContainer>
        </FooterLinkContainer>
      </FooterContent>
    </FooterContainer>
  )
}

export default Footer;

const FooterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 0;
  border-top: 1px solid rgb(25, 25, 25);
  width: 100%;
  position: relative;
  z-index: 100;

  @media (max-width: 768px) {
    padding: 20px 20px 30px 20px;
  }
`;

const FooterContent = styled.div``;

const FooterLinkContainer = styled.div`
width: 500px;

@media (max-width: 768px) {
  width: 100%;
  }
`;

const FooterLinkTitle = styled.h1`
  color: gray;
  font-size: 17px;
`;

const FooterLinkContent = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 35px;

  @media (max-width: 768px) {
    margin-top: 26px;
  }
`;

const FooterLink = styled.a`
  color: gray;
  font-size: 14px;
  width: 110px;
  margin-bottom: 21px;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }

  @media (max-width: 768px) {
    margin-bottom: 16px;
  }
`;

const FooterDescriptionContainer = styled.div`
  margin-top: 30px;

  @media (max-width: 768px) {
    margin-top: 20px;
  }
`

const FooterDescriptionRights = styled.h2`
  color: white;
  font-size: 14px;
  text-align: center;
`
