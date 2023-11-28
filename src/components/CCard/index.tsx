import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

interface DataProps {
  fromLocation: string;
  toLocation: string;
  dates: string;
  fare: string;
  price: string;
  id: string;
}

interface Props {
  data: DataProps;
  handleDetailClick?: (id: string) => void;
  handleBuyClick?: (id: string) => void;
}

const imageUrl = "https://picsum.photos/seed/123/200/300";

export default function CCard({
  data,
  handleDetailClick,
  handleBuyClick,
}: Props) {
  const { fromLocation, toLocation, dates, fare, price, id } = data;
  return (
    <Card sx={{ maxWidth: 345, minHeight: 450 }}>
      <CardMedia sx={{ height: 140 }} image={imageUrl} title='green iguana' />
      <CardContent>
        <Typography gutterBottom variant='h6' component='div' height={70}>
          {fromLocation} - {toLocation}
        </Typography>
        <Typography variant='body1' color='text.secondary'>
          Time: {dates}
        </Typography>
        <Typography variant='body1' color='text.secondary'>
          Fare: {fare}
        </Typography>
        <Typography variant='body1' color='text.secondary'>
          Price: {price}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size='small'
          onClick={() => handleBuyClick && handleBuyClick(id)}
        >
          Buy
        </Button>
        <Button
          size='small'
          onClick={() => handleDetailClick && handleDetailClick(id)}
        >
          Show More
        </Button>
      </CardActions>
    </Card>
  );
}
