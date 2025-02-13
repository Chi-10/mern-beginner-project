import { Container, Text, VStack, SimpleGrid, Spinner } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { useProductStore } from '../store/product'
import { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard'

export const HomePage = () => {
  const { fetchProducts, products } = useProductStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      await fetchProducts();  // Wait until the products are fetched
      setLoading(false);       // Set loading to false after fetching is done
    };
    loadProducts();
  }, [fetchProducts]);

  return (
    <Container maxW='container.xl' py={12}>
      <VStack spacing={8}>
        <Text
          fontSize={"30"}
          fontWeight={"bold"}
          bgGradient={"linear(to-r, cyan.400, blue.500)"}
          bgClip={"text"}
          textAlign={"center"}
        >
          Current Products 🚀
        </Text>

        {loading ? (
			<VStack>
          <Spinner size={'xl'} borderWidth={'4px'}/>
		  <Text color={'white'} fontSize={'xl'} fontWeight={'bold'} >Loading...</Text>
		  </VStack>
        ) : (
          <SimpleGrid
            columns={{
              base: 1,
              md: 2,
              lg: 3,
            }}
            spacing={10}
            w={"full"}
          >
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </SimpleGrid>
        )}

        {products.length === 0 && (
          <Text fontSize='xl' textAlign={"center"} fontWeight='bold' color='gray.500'>
            No products found 😢{" "}
            <Link to={"/create"}>
              <Text as='span' color='blue.500' _hover={{ textDecoration: "underline" }}>
                Create a product
              </Text>
            </Link>
          </Text>
        )}
      </VStack>
    </Container>
  )
};
