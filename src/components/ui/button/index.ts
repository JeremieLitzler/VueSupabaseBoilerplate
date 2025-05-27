import { cva, type VariantProps } from 'class-variance-authority'

export { default as Button } from './Button.vue'

export const buttonVariants = cva(
  `inline-flex items-center justify-center gap-2
        whitespace-nowrap rounded-md 
        text-sm font-medium
        focus:outline-2 focus:outline-offset-2 focus:outline-cta-darker 
        disabled:pointer-events-none disabled:opacity-50
        [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0`,
  {
    variants: {
      variant: {
        default: `bg-cta-base text-cta-neutral-light 
                  shadow hover:bg-cta-darker`,
        secondary: `bg-cta-light text-cta-darker 
                    shadow-xs hover:bg-cta-base hover:bg-cta-lighter
                    focus:outline-cta-base`,
        destructive: `bg-cta-destructive text-cta-destructive-lighter 
                      shadow-xs hover:bg-cta-destructive-darker
                      focus:outline-cta-destructive-darker`,
        outline: `bg-cta-neutral-dark text-cta-neutral-light
                  hover:bg-cta-neutral-light hover:text-cta-neutral-dark
                  focus:outline-cta-darker`,
        ghost: `bg-cta-lighter text-cta-darker/50 
                hover:bg-cta-light/50 hover:text-cta-darker/80
                focus:outline-cta-base`,
        invisible: `bg-transparent  
                hover:bg-cta-light/50 hover:text-cta-darker/80
                focus:outline-cta-base`,
        link: `text-primary-2 underline-offset-4 underline hover:decoration-dotted
               focus:outline-cta-neutral-dark`,
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-10 rounded-md px-8',
        outline: 'h-9',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export type ButtonVariants = VariantProps<typeof buttonVariants>
