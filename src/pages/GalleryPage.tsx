// @ts-ignore
import DomeGallery from '../components/DomeGallery'

const IMAGES = [
  { src: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=900&q=90&auto=format&fit=crop', alt: 'Architecture' },
  { src: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=900&q=90&auto=format&fit=crop', alt: 'Corporate' },
  { src: 'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=900&q=90&auto=format&fit=crop', alt: 'Film' },
  { src: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=900&q=90&auto=format&fit=crop', alt: 'Fashion' },
  { src: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=900&q=90&auto=format&fit=crop', alt: 'Architecture II' },
  { src: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=900&q=90&auto=format&fit=crop', alt: 'Wedding' },
  { src: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=900&q=90&auto=format&fit=crop', alt: 'Architecture III' },
  { src: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=900&q=90&auto=format&fit=crop', alt: 'Events' },
  { src: 'https://images.unsplash.com/photo-1560472355-536de3962603?w=900&q=90&auto=format&fit=crop', alt: 'Portrait' },
  { src: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=900&q=90&auto=format&fit=crop', alt: 'Corporate II' },
  { src: 'https://images.unsplash.com/photo-1488972685288-c3fd157d7c7a?w=900&q=90&auto=format&fit=crop', alt: 'Architecture IV' },
  { src: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=900&q=90&auto=format&fit=crop', alt: 'Fashion II' },
]

export default function GalleryPage() {
  return (
    <div style={{ position: 'fixed', inset: 0, background: '#F5F1EA' }}>
      <DomeGallery
        images={IMAGES}
        grayscale={false}
        overlayBlurColor="#F5F1EA"
        imageBorderRadius="10px"
        openedImageBorderRadius="14px"
        openedImageWidth="460px"
        openedImageHeight="580px"
        fit={0.92}
        fitBasis="min"
        minRadius={400}
        dragSensitivity={18}
        dragDampening={1.8}
      />
    </div>
  )
}
