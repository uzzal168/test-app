"use client";
import ImageCarousel from "@/components/ImageCarousel/inex";

export default function Home() {
  return (
    <main>
      <div className="container">
        <ImageCarousel
          images={[
            "https://images.unsplash.com/photo-1605457867610-e990b192418e?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2Fyb3VzZWx8ZW58MHx8MHx8fDA%3D",
            "https://images.unsplash.com/photo-1577774438656-768f1e5d9ed6?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2Fyb3VzZWx8ZW58MHx8MHx8fDA%3D",
            'https://www.w3.org/TR/2019/NOTE-wai-aria-practices-1.1-20190207/examples/carousel/carousel-1/images/lands-endslide__800x600.jpg',
            'https://fastly.picsum.photos/id/54/1024/480.jpg?hmac=MfVNcs6pENu_41pux1kb9sLGUEvwhioKVpsoGgZUm_c'
          ]}
        />
      </div>
    </main>
  );
}
