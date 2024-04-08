export const scrollTo = (destinationId: string): void => {
    const element = document.getElementById(destinationId);
    element?.scrollIntoView({behavior: 'smooth'});
}