import {
  graphql,
  Link as GatsbyLink,
} from 'gatsby';
import {
  Box,
  Text,
  Heading,
  Link as ChakraLink,
  useColorModeValue,
} from '@chakra-ui/react';
import SEO from '@components/seo';
import PostsSection from '@components/post/posts-section';
import { SkipNavContent } from '@components/skip-nav';

export const query = graphql`
  query {
    site {
      siteMetadata {
        description
      }
    }
    allMdx(
      limit: 7
      sort: {order: DESC, fields: frontmatter___date}
    ) {
      nodes {
        id
        frontmatter {
          title
          tags
          slug
          date(formatString: "YYYY-MM-DD")
        }
      }
    }
  }
`;

const items = [
  {
    imgProps: {
      src: '/images/netlify.svg',
      width: 40,
      height: 40,
    },
    href: 'https://www.netlify.com/',
    ariaLabel: 'Go to netlify.com',
  },
  {
    imgProps: {
      src: '/images/gatsby.svg',
      width: 40,
      height: 40,
    },
    href: 'https://github.com/gatsbyjs/gatsby',
    ariaLabel: 'Go to Gatsby GitHub page',
  },
  {
    imgProps: {
      src: '/images/chakra-ui.svg',
      width: 40,
      height: 40,
    },
    href: 'https://github.com/chakra-ui/chakra-ui',
    ariaLabel: 'Go to Chakra UI GitHub page',
  },
  {
    imgProps: {
      src: '/images/mermaid.png',
      width: 40,
      height: 40,
    },
    href: 'https://github.com/mermaid-js/mermaid',
    ariaLabel: 'Go to mermaid GitHub page',
  },
  {
    imgProps: {
      src: '/images/mdx.svg',
      width: 96.6,
      height: 40,
    },
    href: 'https://github.com/mdx-js/mdx',
    ariaLabel: 'Go to mdx-js GitHub page',
  },
];

const BuiltWith = () => (
  <Box>
    <Heading
      as="h2"
      fontSize="2xl"
      marginBottom="3"
      color={useColorModeValue('gray.600', 'gray.200')}
    >
      Built With
    </Heading>
    <Box
      display="flex"
      flexWrap="wrap"
      marginBottom="-1em"
    >
      {items.map(({ href, imgProps, ariaLabel }) => (
        <ChakraLink
          d="inline-block"
          margin="0 1em 1em 0"
          isExternal
          key={href}
          href={href}
          aria-label={ariaLabel}
        >
          <img alt={ariaLabel} {...imgProps} />
        </ChakraLink>
      ))}
    </Box>
  </Box>
);

const Index = ({ data }) => {
  const posts = data.allMdx.nodes;
  const description = data.site.siteMetadata?.description;
  const textOrange = useColorModeValue('orange.500', 'orange.200');

  return (
    <>
      <SEO />
      <Box
        display="flex"
        flexDirection={['column', 'column', 'row']}
        maxWidth="4xl"
        margin="0 auto"
        height="100%"
      >
        <Box
          as="aside"
          flex={['auto', 'auto', '0 0 25%']}
          marginBottom={['6', '6', '0']}
          marginRight={['0', '0', '12']}
        >
          <Text
            marginBottom="6"
            lineHeight="1.2"
          >
            {description}
          </Text>
          <BuiltWith />
        </Box>

        <Box flex="auto">
          <SkipNavContent />
          <PostsSection marginBottom="8">
            <PostsSection.Heading>
              Recent Posts
            </PostsSection.Heading>
            <PostsSection.List posts={posts} />
          </PostsSection>

          <Box textAlign="right">
            <ChakraLink
              as={GatsbyLink}
              to="/posts"
              color={textOrange}
              fontWeight="bold"
            >
              to=&quot;/posts&quot;
            </ChakraLink>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Index;
